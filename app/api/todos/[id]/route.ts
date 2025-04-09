import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    const todo = await prisma.todo.update({
        where: { id: Number(params.id) },
        data: { completed: true },
    });
    return NextResponse.json(todo);
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
    await prisma.todo.delete({ where: { id: Number(params.id) } });
    return NextResponse.json({ message: 'Deleted' });
}
