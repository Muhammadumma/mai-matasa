import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Parse JSON & URL-encoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Load local .env if present (Render supplies env vars via process.env directly)
if (fs.existsSync(path.join(__dirname, '.env'))) {
  try {
    const envFile = fs.readFileSync(path.join(__dirname, '.env'), 'utf-8');
    envFile.split('\n').forEach(line => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const idx = trimmed.indexOf('=');
        if (idx !== -1) {
          const key = trimmed.substring(0, idx).trim();
          const val = trimmed.substring(idx + 1).trim().replace(/^["']|["']$/g, '');
          if (!process.env[key]) {
            process.env[key] = val;
          }
        }
      }
    });
  } catch (err) {
    console.warn('Notice: Could not parse .env file', err);
  }
}

// 11 official wards of Birnin-Kudu Constituency (exact spellings)
const VALID_WARDS = [
  "Birnin Kudu",
  "Kangire",
  "Kantoga",
  "Kiyako",
  "Kwangwara",
  "Lafiya",
  "Maiaduwa",
  "Surko",
  "Unguwar 'Ya",
  "Wurno",
  "Yalwan Damai"
];

// Helper: validate Nigerian mobile phone format
function isValidNigerianPhone(phone) {
  if (!phone || typeof phone !== 'string') return false;
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
  // Matches Nigerian mobile: +234XXXXXXXXXX, 234XXXXXXXXXX, or 0XXXXXXXXXX (starting with 7, 8, or 9)
  return /^(\+?234|0)[789]\d{9}$/.test(cleanPhone);
}

// Helper: validate and normalize ward
function getValidWard(wardInput) {
  if (!wardInput || typeof wardInput !== 'string') return null;
  const normalized = wardInput.trim().toLowerCase();
  return VALID_WARDS.find(w => w.toLowerCase() === normalized) || null;
}

// In-memory duplicate prevention: store phone -> timestamp
const recentSubmissions = new Map();

function checkDuplicateSubmission(phone) {
  const normalized = phone.replace(/\D/g, '');
  const now = Date.now();
  if (recentSubmissions.has(normalized)) {
    const lastTimestamp = recentSubmissions.get(normalized);
    if (now - lastTimestamp < 60 * 1000) {
      return true;
    }
  }
  recentSubmissions.set(normalized, now);

  // Periodically clean up entries older than 2 minutes
  if (recentSubmissions.size > 200) {
    for (const [key, timestamp] of recentSubmissions.entries()) {
      if (now - timestamp > 120 * 1000) {
        recentSubmissions.delete(key);
      }
    }
  }
  return false;
}

// Volunteer Registration Endpoint handler
async function handleVolunteerRegistration(req, res) {
  try {
    const {
      fullName,
      name,
      phone,
      email,
      gender,
      age,
      ward,
      community,
      pollingUnit,
      interest,
      interests,
      volunteerRole,
      availability,
      notes
    } = req.body || {};

    const applicantName = (fullName || name || '').trim();
    const applicantPhone = (phone || '').trim();
    const rawWard = (ward || '').trim();

    // Determine interest / volunteer role string
    let applicantInterest = '';
    if (volunteerRole && volunteerRole.trim()) {
      applicantInterest = volunteerRole.trim();
    } else if (typeof interest === 'string' && interest.trim()) {
      applicantInterest = interest.trim();
    } else if (Array.isArray(interests) && interests.length > 0) {
      applicantInterest = interests.join(', ');
    } else if (typeof interests === 'string' && interests.trim()) {
      applicantInterest = interests.trim();
    }

    // 1. Validate required fields: Name, Phone, Ward, Interest
    const missing = [];
    if (!applicantName) missing.push('Full Name');
    if (!applicantPhone) missing.push('Phone Number');
    if (!rawWard) missing.push('Ward');
    if (!applicantInterest) missing.push('Volunteer Role / Interest');

    if (missing.length > 0) {
      return res.status(400).json({
        success: false,
        error: `Missing required field(s): ${missing.join(', ')}.`
      });
    }

    // 2. Validate Nigerian phone format
    if (!isValidNigerianPhone(applicantPhone)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid Nigerian phone number. Please enter a valid number (e.g. 08012345678 or +2348012345678).'
      });
    }

    // 3. Validate Ward against 11 official wards
    const matchedWard = getValidWard(rawWard);
    if (!matchedWard) {
      return res.status(400).json({
        success: false,
        error: `Invalid Ward "${rawWard}". Must be one of: ${VALID_WARDS.join(', ')}.`
      });
    }

    // 4. In-memory duplicate check (prevent submissions within 60 seconds)
    if (checkDuplicateSubmission(applicantPhone)) {
      return res.status(429).json({
        success: false,
        error: 'A registration for this phone number was recently submitted. Please wait 60 seconds before submitting again.'
      });
    }

    // 5. Build clean, readable Telegram message
    const telegramMessage = `🇳🇬 New Volunteer Registration — MAIMATASA 4 BKD

👤 Personal Information:
• Name: ${applicantName}
• Phone: ${applicantPhone}
• Email: ${email && email.trim() ? email.trim() : 'Not provided'}
• Gender: ${gender && gender.trim() ? gender.trim() : 'Not specified'}
• Age: ${age ? String(age).trim() : 'Not specified'}

📍 Constituency & Location:
• Constituency: Birnin-Kudu Constituency (BKD)
• Ward: ${matchedWard}
• Community: ${community && community.trim() ? community.trim() : 'Not specified'}
• Polling Unit: ${pollingUnit && pollingUnit.trim() ? pollingUnit.trim() : 'Not specified'}

🎯 Volunteer Interests:
• Role / Areas: ${applicantInterest}
• Availability: ${availability && availability.trim() ? availability.trim() : 'Not specified'}
• Notes: ${notes && notes.trim() ? notes.trim() : 'None'}

📅 Submitted: ${new Date().toLocaleString('en-GB', { timeZone: 'Africa/Lagos' })} (WAT)`;

    // 6. Send to Telegram Bot API
    const botToken = process.env.BOT_TOKEN || '8556861348:AAGJVxJpHuVkew-Yo984ft6OAo5p2uUUc8Y';
    const chatId = process.env.CHAT_ID;

    if (!chatId) {
      console.error('CHAT_ID environment variable is not configured');
      return res.status(500).json({
        success: false,
        error: 'Server configuration error: CHAT_ID environment variable is missing on Render. Please configure CHAT_ID in your Render dashboard.'
      });
    }

    const telegramEndpoint = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const tgResponse = await fetch(telegramEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: telegramMessage
      })
    });

    const tgData = await tgResponse.json();
    if (!tgData.ok) {
      console.error('Telegram API error:', tgData);
      return res.status(502).json({
        success: false,
        error: `Telegram delivery error: ${tgData.description || 'Unable to deliver message.'}`
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Thank you! Your registration has been received.'
    });
  } catch (error) {
    console.error('Server error processing volunteer registration:', error);
    return res.status(500).json({
      success: false,
      error: 'An unexpected server error occurred. Please try again.'
    });
  }
}

// Register both /register and /api/register
app.post('/register', handleVolunteerRegistration);
app.post('/api/register', handleVolunteerRegistration);

const distPath = path.join(__dirname, 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
}
app.use(express.static(__dirname));

app.get('*', (req, res) => {
  if (fs.existsSync(path.join(distPath, 'index.html'))) {
    res.sendFile(path.join(distPath, 'index.html'));
  } else {
    res.sendFile(path.join(__dirname, 'index.html'));
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
