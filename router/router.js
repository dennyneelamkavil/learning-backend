const router = require("express").Router();
const multer = require("multer");
const {
  getStudent,
  getStudentById,
  deleteStudentById,
  updateStudentById,
  addStudentWithImage,
} = require("../controllers/studentController");
const sendEmail = require("../controllers/mailController");
const asyncHandler = require("../utils/asyncHandler");
const createQRCode = require("../controllers/qrCodeGenerator");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "_" + file.originalname);
  },
});
const upload = multer({ storage: storage });

// CRUD operations - Create Read Update Delete
// GET POST PUT DELETE

router.get("/", async (req, res) => {
  res.status(200).send("Hello, this is router module");
});

router.post("/student", upload.single("image"), asyncHandler(addStudentWithImage));
router.get("/student", asyncHandler(getStudent));
router.get("/student/:id", asyncHandler(getStudentById));
router.delete("/student/:id", asyncHandler(deleteStudentById));
router.put("/student/:id", asyncHandler(updateStudentById));

router.post("/sendemail", asyncHandler(sendEmail));
router.post("/createQRCode", asyncHandler(createQRCode));

// upload image
// router.post("/student/imageUpload", upload.single("image"), async (req, res) => {
//   try {
//     console.log("read image", req.file);
//     res.status(200).send("Read image successfully");
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error reading image: " + error);
//   }
// });

module.exports = router;
