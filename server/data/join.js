import { db } from '../DB/database.js';

// // id 중복검사
export async function findById(id) {
  return db.execute('SELECT * FROM users WHERE id = ?', [id]).then((result) => {
    return result[0][0];
  });
}

// 회원가입
export async function createUser(user) {
  const { id, local, hashed, phone, name } = user;
  try{
    const result = await db.execute(
      "INSERT INTO users (id, local, password, phone, name) VALUES (?, ?, ?, ?, ?)", [id, local, hashed, phone, name]
    );

    if (result){
      return result[0].insertId;
    }

  }catch(error){
    console.error(error);
  }
}