import {prisma, monolithURL} from '../configs/config';
import axios from 'axios';

// this function to initialize userApp table in prisma
export default async function init(){
    try{
        const loginPort = `${monolithURL}/controller/synchronize_rest_controller.php`;
        const response = await axios.get(loginPort);
        const data = response.data;
        //data is array of user, need for user_id parameter
        for (let i = 0; i < data.length; i++) {
            const userID = data[i]["user_id"];
            const isAdmin = data[i]["is_admin"];
            await prisma.userApp.create({
                data: {
                    user_id: userID,
                    credits: 0,
                    isPremium: isAdmin? true : false,
                }
            })
        }
        console.log("user synchronization success")
    }
    catch(e){
        console.log("user synchronization failed");
    }

    await seed()


}

async function seed() {
    try {
      const seedData = [
        { code: 'a1b2c3d4e5', user_id: 1, isValid: true },
        { code: 'f6g7h8i9j0', user_id: 25, isValid: true },
        { code: 'k1l2m3n4o5', user_id: 26, isValid: true },
        { code: 'p6q7r8s9t0', user_id: 27, isValid: true },
        { code: 'u1v2w3x4y5', user_id: 1, isValid: true },
        { code: 'z6a7b8c9d0', user_id: 25, isValid: true },
        { code: 'e1f2g3h4i5', user_id: 26, isValid: true },
        { code: 'j6k7l8m9n0', user_id: 27, isValid: true },
        { code: 'o1p2q3r4s5', user_id: 1, isValid: true },
        { code: 't6u7v8w9x0', user_id: 25, isValid: true },
        { code: 'y1z2a3b4c5', user_id: 26, isValid: true },
        { code: 'd6e7f8g9h0', user_id: 27, isValid: true },
        { code: 'i1j2k3l4m5', user_id: 1, isValid: true },
        { code: 'n6o7p8q9r0', user_id: 25, isValid: true },
        { code: 's1t2u3v4w5', user_id: 26, isValid: true },
        { code: 'x6y7z8a9b0', user_id: 27, isValid: true },
        { code: 'c1d2e3f4g5', user_id: 1, isValid: true },
        { code: 'h6i7j8k9l0', user_id: 25, isValid: true },
        { code: 'm1n2o3p4q5', user_id: 26, isValid: true },
      ];
  
      // Gunakan Prisma Client untuk menyisipkan data ke dalam database
      await prisma.referralCode.createMany({
        data: seedData,
      });
  
      console.log('Seed succeeded!');
    } catch (error) {
      console.error('Something wrong:', error);
    } finally {

    }
}
