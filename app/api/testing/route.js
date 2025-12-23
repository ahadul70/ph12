export async function GET(req) {
    const feedBack = await connect("feedback").find({}).toArray();
    const result = {
        status: 200,
        message: "Hello World",
        feedBack
    }
    return Response.json(result);
}


export async function POST(req) {
    const data = await req.json();

    return Response.json({
        status: 200,
        message: "Hello World",
        data
    });
}
