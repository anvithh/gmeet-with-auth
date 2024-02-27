import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel.js";

import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    console.log("Request Body", reqBody);

    //check if user already exists
    const user = User.findOne({ email });

    if (await user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    } else {
      console.log("NEW USER CREATED");
    }

    //hash the password

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    console.log(newUser);

    const savedUser = await newUser.save();

    return NextResponse.json({
      message: "User Created Successfully",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }), { status: 500 };
  }
}
