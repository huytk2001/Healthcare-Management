const connection = require("../config/database");

const AppointmentModel = {
  getAllAppointments: async () => {
    try {
      const [appointments] = await connection.promise().execute(`
      SELECT 
      appointments.*,
      users_doctor.Name AS DoctorName,
      users_customer.Name AS CustomerName,
      rooms.Room_Number
    FROM appointments
    INNER JOIN doctors ON appointments.Doctor_id = doctors.Doctor_id
    INNER JOIN customers ON appointments.Customer_id = customers.Customer_id
    INNER JOIN users AS users_doctor ON doctors.User_id = users_doctor.User_id
    INNER JOIN users AS users_customer ON customers.User_id = users_customer.User_id
    INNER JOIN rooms ON appointments.Room_id = rooms.Room_id;
    `);

      return appointments;
    } catch (error) {
      console.error("Error in getAllAppointments:", error);
      throw error;
    }
  },

  getAllAppointmentsDoctorId: async (userId) => {
    try {
      // Lấy Doctor_id từ User_id
      const [doctorResult] = await connection
        .promise()
        .execute("SELECT Doctor_id FROM doctors WHERE User_Id = ?", [userId]);

      if (!doctorResult || !doctorResult.length) {
        // Trả về mảng trống nếu không tìm thấy Doctor_id
        return [];
      }

      const doctorId = doctorResult[0].Doctor_id;

      // Truy vấn các cuộc hẹn từ Doctor_id
      const [appointments] = await connection.promise().execute(
        `
          SELECT
            appointments.*,
            customers.Customer_id,
            users.Name AS CustomerName,
            users.Phone AS CustomerPhone,
            users.Gender AS CustomerGender,
            users.Date_of_birth AS CustomerDOB,
            rooms.Room_Number AS RoomNumber
          FROM
            appointments
          JOIN
            customers ON appointments.Customer_id = customers.Customer_id
          JOIN
            users ON customers.User_id = users.User_id
          JOIN
            rooms ON appointments.Room_id = rooms.Room_id
          WHERE
            appointments.Doctor_id = ?;
        `,
        [doctorId]
      );

      return appointments;
    } catch (error) {
      console.error("Error in getAllAppointmentsDoctorId:", error);
      throw error;
    }
  },

  updateStatus: async (appointmentId, newStatus) => {
    try {
      const [result] = await connection
        .promise()
        .execute(
          "UPDATE appointments SET Status = ? WHERE Appointment_id = ?",
          [newStatus, appointmentId]
        );

      return result.affectedRows > 0; // Trả về true nếu cập nhật thành công
    } catch (error) {
      console.error("Error updating status:", error);
      throw error;
    }
  },

  getAppointmentInfo: async (userId) => {
    try {
      // Lấy doctor_id từ user_id
      const [doctorIdResult] = await connection
        .promise()
        .execute("SELECT Doctor_id FROM doctors WHERE User_id = ?", [userId]);

      // Kiểm tra xem có doctor_id hay không
      if (doctorIdResult.length === 0) {
        // Nếu không tìm thấy doctor_id, trả về null
        return null;
      }

      const doctorId = doctorIdResult[0].Doctor_id;

      // Truy vấn SQL để lấy thông tin cuộc hẹn dựa trên doctor_id
      const [appointmentInfo] = await connection.promise().execute(
        `
          SELECT
            rooms.Room_Number AS RoomNumber,
            appointments.Date,
            appointments.Time
          FROM
            appointments
          JOIN
            rooms ON appointments.Room_id = rooms.Room_id
          WHERE
            appointments.Doctor_id = ?;
        `,
        [doctorId]
      );

      // Kiểm tra xem có dữ liệu hay không
      if (appointmentInfo.length > 0) {
        // Nếu có dữ liệu, trả về một mảng chứa thông tin của tất cả cuộc hẹn
        return appointmentInfo.map((appointment) => ({
          roomNumber: appointment.RoomNumber,
          date: appointment.Date,
          time: appointment.Time,
        }));
      } else {
        // Không tìm thấy cuộc hẹn
        return null;
      }
    } catch (error) {
      console.error("Error in getAppointmentInfo:", error);
      throw error;
    }
  },
};

module.exports = AppointmentModel;
