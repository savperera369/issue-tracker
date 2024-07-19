import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/client";

// give it an object that defines the shape of the body for our request
// zod is for data validation checking
const createIssueSchema = z.object({
    title: z.string().min(1).max(255),
    description: z.string().min(1),
});

export async function POST(request: NextRequest) {
    const body = await request.json();
    // use schema to validate body of request
    const validation = createIssueSchema.safeParse(body);
    if (!validation.success){
        return NextResponse.json(validation.error.errors, { status: 400 })
    }

    const newIssue = await prisma.issue.create({
        data: { title: body.title, description: body.description }
    });

    return NextResponse.json(newIssue, { status: 201 });
}