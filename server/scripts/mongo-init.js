// Optional MongoDB shell reference. The application creates collections/indexes through Mongoose.
// Run the app once to create the schema. Database name: employee_attendance.
use('employee_attendance');
db.users.createIndex({email:1},{unique:true});
db.attendances.createIndex({employee:1,date:1},{unique:true});
