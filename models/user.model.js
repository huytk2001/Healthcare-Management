const connection = require("../config/database");
const { getRoomIdByRoomNumber } = require("../models/room.model");

const UserModel = {
  authenticateAdmin: async (email, password) => {
    try {
      console.log("Email and Password:", email, password);

      const [rows, fields] = await connection
        .promise()
        .execute("SELECT * FROM users WHERE Email = ? AND Password = ?", [
          email,
          password,
        ]);

      console.log("Query Result:", rows);

      if (rows.length === 1) {
        return rows[0];
      } else {
        throw new Error("Sai email hoặc mật khẩu");
      }
    } catch (error) {
      console.error("Error authenticating admin:", error.message);
      throw error;
    }
  },

  findOneByEmail: async function (email) {
    try {
      const [rows] = await connection
        .promise()
        .execute(
          "SELECT User_Id, Email, Password, Role FROM Users WHERE Email = ?",
          [email]
        );

      return rows[0];
    } catch (error) {
      console.error("Error in findOneByEmail:", error);
      throw error;
    }
  },

  getAllUser: async function () {
    try {
      const [rows] = await connection.promise().execute("SELECT * FROM users");
      return rows;
    } catch (error) {
      console.error("Lỗi khi truy vấn danh sách danh mục:", error);
      throw error;
    }
  },

  createUser: async function (userData) {
    try {
      const { email, password } = userData;

      const [userResult] = await connection
        .promise()
        .execute(
          "INSERT INTO users ( Email, Password, Role) VALUES (?, ?, ?)",
          [email, password, "customer"]
        );
      return userResult;
    } catch (error) {
      console.error("Error in create:", error);
      throw error;
    }
  },

  createDoctor: async function (userData) {
    try {
      const {
        name,
        email,
        phone,
        password,
        specialty1,
        specialty2,
        address,
        roomNumber,
      } = userData;

      // Thêm thông tin vào bảng users
      const [userResult] = await connection.promise().execute(
        "INSERT INTO users (Name, Email, Password, Role) VALUES (?, ?, ?, ?)",
        [name, email, password, "doctor"] // Giả sử bạn đang thêm bác sĩ, nên đặt Role là "doctor"
      );

      const userId = userResult.insertId;

      // Thêm thông tin vào bảng doctors
      const [doctorResult] = await connection
        .promise()
        .execute(
          "INSERT INTO doctors (User_id, Specialty1, Specialty2, Phone, Address, Room_Number) VALUES (?, ?, ?, ?, ?, ?)",
          [userId, specialty1, specialty2, phone, address, roomNumber]
        );

      return userId; // Trả về ID của bản ghi mới được tạo
    } catch (error) {
      console.error("Error in create:", error);
      throw error;
    }
  },

  getDoctor: async function (userId) {
    try {
      // Lấy toàn bộ thông tin của bác sĩ dựa trên user_id
      const [fullDoctorResult] = await connection
        .promise()
        .execute(
          "SELECT * FROM users INNER JOIN doctors ON users.User_id = doctors.User_id WHERE users.User_id = ?",
          [userId]
        );

      if (fullDoctorResult.length > 0) {
        // fullDoctorResult[0] chứa toàn bộ thông tin của bác sĩ
        return fullDoctorResult[0];
      } else {
        // Trả về null hoặc thông báo lỗi tùy thuộc vào yêu cầu của bạn
        return null;
      }
    } catch (error) {
      console.error("Error in getDoctor:", error);
      throw error;
    }
  },

  getAllDoctors: async function () {
    try {
      const [allDoctorsResult] = await connection
        .promise()
        .execute(
          "SELECT * FROM users INNER JOIN doctors ON users.User_id = doctors.User_id"
        );

      if (allDoctorsResult.length > 0) {
        return allDoctorsResult;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error in getAllDoctors:", error);
      throw error;
    }
  },

  createAppointment: async function (appointmentData) {
    try {
      const {
        userId,
        doctorId,
        roomNumber, // Sửa từ roomId thành roomNumber
        appointmentDate,
        appointmentTime,
        customerName,
        customerGender,
        customerDOB,
        customerPhone,
        customerAddress,
      } = appointmentData;

      // Kiểm tra xem người dùng có tồn tại không
      const [userCheck] = await connection
        .promise()
        .execute("SELECT * FROM users WHERE User_id = ?", [userId]);

      // Nếu không tìm thấy người dùng, ném lỗi
      if (userCheck.length === 0) {
        throw new Error(`Không tìm thấy người dùng với ID ${userId}.`);
      }

      // Sử dụng userId đã được cung cấp
      const customerUserId = userId;

      // Cập nhật thông tin người dùng trong bảng users
      await connection
        .promise()
        .execute(
          "UPDATE users SET Name = ?, Gender = ?, Date_of_birth = ?, Phone = ?, Address = ? WHERE User_id = ?",
          [
            customerName,
            customerGender,
            customerDOB,
            customerPhone,
            customerAddress,
            customerUserId,
          ]
        );

      // Thêm thông tin người dùng vào bảng customers
      const [customerResult] = await connection
        .promise()
        .execute("INSERT INTO customers (User_id) VALUES (?)", [
          customerUserId,
        ]);

      // Lấy thông tin Customer_id từ bảng customers
      const [customerIdResult] = await connection
        .promise()
        .execute("SELECT Customer_id FROM customers WHERE User_id = ?", [
          customerUserId,
        ]);

      // Lấy Customer_id
      const customerID = customerIdResult[0].Customer_id;

      // Lấy room_id từ room_number
      const roomId = await getRoomIdByRoomNumber(roomNumber);

      // Thêm lịch hẹn vào bảng appointments
      const [appointmentResult] = await connection
        .promise()
        .execute(
          "INSERT INTO appointments (Doctor_id, Customer_id, Room_id, Date, Time, Status) VALUES (?, ?, ?, ?, ?, ?)",
          [
            doctorId,
            customerID,
            roomId, // Sửa từ roomNumber thành roomId
            appointmentDate,
            appointmentTime,
            "Đang xử lý",
          ]
        );

      return {
        customerUserId,
        appointmentId: appointmentResult.insertId,
      };
    } catch (error) {
      console.error("Lỗi trong createAppointment:", error);
      throw error;
    }
  },

  // Add other CRUD operations as needed
};

module.exports = UserModel;
