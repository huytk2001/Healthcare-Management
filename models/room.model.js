const connection = require("../config/database");

const RoomModel = {
  createRoomForDoctor: async () => {
    try {
      // Lấy giá trị Room_Number hiện tại của bác sĩ và tăng lên 1
      const [currentRoomNumber] = await connection
        .promise()
        .execute("SELECT MAX(Doctor_id) AS maxRoomNumber FROM doctors");

      const newRoomNumber = (currentRoomNumber[0].maxRoomNumber || 0) + 1;

      const [rooms] = await connection
        .promise()
        .execute("INSERT INTO rooms (Room_Number, Available) VALUES (?, ?)", [
          newRoomNumber,
          1,
        ]);

      return newRoomNumber;
    } catch (error) {
      console.error("Error in createRoomForDoctor:", error);
      throw error;
    }
  },
  getRoomIdByRoomNumber: async (roomNumber) => {
    try {
      // Thực hiện truy vấn để lấy room_id từ room_number
      const [result] = await connection
        .promise()
        .execute("SELECT Room_id FROM rooms WHERE Room_number = ?", [
          roomNumber,
        ]);

      if (result.length > 0) {
        // Trả về room_id nếu tìm thấy
        return result[0].Room_id;
      } else {
        // Trả về null hoặc giá trị thích hợp nếu không tìm thấy
        return null;
      }
    } catch (error) {
      console.error("Error in getRoomIdByRoomNumber:", error);
      throw error;
    }
  },
};

module.exports = RoomModel;
