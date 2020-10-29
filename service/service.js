// export default class UserService() {

//   async Signup(user) {
//     const userRecord = await UserModel.create(user);
//     const companyRecord = await CompanyModel.create(userRecord); // needs userRecord to have the database id 
//     const salaryRecord = await SalaryModel.create(userRecord, companyRecord); // depends on user and company to be created
      


//     await EmailService.startSignupSequence(userRecord)
  

//       return { user: userRecord, company: companyRecord };
//   }
// }