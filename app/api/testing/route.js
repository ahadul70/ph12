import { connect } from "@/lib/db";
 const feedBack = await connect("feedback");
export async function GET(req) {
    const result = await feedBack.find({}).toArray();
    return Response.json(result);
}


export async function POST(req) {
   
    const {message} = await req.json();
    console.log(message);
    const result = await feedBack.insertOne({message});

    return Response.json(result);
}
