const url = "postgresql://neondb_owner:npg_vfurXdkBS60W@ep-patient-recipe-acdnirmx-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require";
console.log("URL:", url);
console.log("URL Length:", url.length);
console.log("Has spaces:", url.includes(' '));
console.log("Trimmed:", url.trim() === url);
