import multer from "multer";
import path from "path";
import { __dirname } from "../utils.js";
import fs from "fs";
import { nanoid } from "nanoid";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { rid } = req.params;
    const path = `${__dirname}/public/replacements/${rid}/`;
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }
    cb(null, path);
  },
  filename: (req, file, cb) => {
    const { rid } = req.params;
    const extension = path.extname(file.originalname);
    const photoId = nanoid();

    const newFilename = `${String(photoId)}${extension}`;
    cb(null, newFilename);
  },
});

// Filtro para aceptar solo imágenes
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  }
  cb(new Error("Solo se permiten imágenes (jpeg, jpg, png, gif)"));
};

// Configurar multer con límites
export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Límite de 5MB por imagen
});
