import multer from 'multer';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';

const UPLOAD_DIR = './public/temp';

// FIX: if ./public/temp doesn't exist (fresh clone, git doesn't track empty
// folders, new deploy), multer fails with ENOENT on every upload.
// Create it once at startup.
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

// IMPROVE: whitelist instead of accepting any file. Without this a user can
// upload .exe, .html, .php, etc. to your server's disk.
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

// IMPROVE: limit size so one huge file can't fill your disk or memory.
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    // FIX: file.originalname as filename means two users uploading "avatar.png"
    // at the same time overwrite each other, and one request can delete the
    // file the other is still uploading to Cloudinary.
    // Random unique name solves that.
    //
    // SECURITY: originalname is user-controlled. Never trust it as a path.
    // We keep only the extension, taken via path.extname, and lowercase it.
    const ext = path.extname(file.originalname).toLowerCase();
    const uniqueName = `${Date.now()}-${crypto.randomBytes(8).toString('hex')}${ext}`;
    cb(null, uniqueName);
  },
});

// IMPROVE: reject bad file types before they are written to disk.
// NOTE: mimetype comes from the client's header and can be faked. For strong
// validation, check the file's magic bytes after upload (e.g. 'file-type' package).
const fileFilter = (req, file, cb) => {
  if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    // Passing an Error here makes multer abort the request. Your error handler
    // will receive it. Use a clear message so the client knows what went wrong.
    return cb(new Error('Only JPEG, PNG, WEBP and GIF images are allowed'));
  }
  cb(null, true);
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: MAX_FILE_SIZE,
    files: 2, // IMPROVE: registerUser only needs avatar + coverImage
  },
});
