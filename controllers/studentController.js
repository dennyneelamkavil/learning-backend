const StudentModel = require("../models/students");

exports.getStudent = async (req, res) => {
    const data = await StudentModel.find({});
    res.status(200).send({ data: data, status: true });
};

exports.getStudentById = async (req, res) => {
    const id = req.params.id;
    const isExist = await StudentModel.findById(id);
    if (!isExist) throw new Error(404, "Not Exist!");

    const data = await StudentModel.findById(id);
    res.status(200).send({ data: data, status: true });
};

exports.deleteStudentById = async (req, res) => {
    const id = req.params.id;
    const isExist = await StudentModel.findById(id);
    if (!isExist) throw new Error(404, "Not Exist!");

    await StudentModel.findByIdAndDelete(id);
    res.status(200).send("Data deleted successfully");
};

exports.updateStudentById = async (req, res) => {
    const id = req.params.id;
    const newData = req.body;
    const isExist = await StudentModel.findById(id);
    if (!isExist) throw new Error(404, "Not Exist!");

    await StudentModel.findByIdAndUpdate(id, newData);
    res.status(200).send({ status: true, message: "Data updated successfully" });
};

exports.addStudentWithImage = async (req, res) => {
    let studentDetails = req.body;
    studentDetails.imageUrl = `http://localhost:2345/uploads/${req.file.filename}`;
    // studentDetails.imageUrl = path.join(__dirname, `/uploads/${req.file.filename}`); // not working - '/router' comes before '/uploads' - router is not needed
    console.log(studentDetails);

    const data = new StudentModel(studentDetails);
    console.log(data);
    await data.save();
    res.status(200).send("Data saved");
};
