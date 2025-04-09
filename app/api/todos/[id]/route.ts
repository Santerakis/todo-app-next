import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface RouteParams {
    params: {
        id: string;
    };
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
    try {
        const todo = await prisma.todo.update({
            where: { id: parseInt(params.id) },
            data: { completed: true },
        });
        return NextResponse.json(todo);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update todo' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
    try {
        await prisma.todo.delete({
            where: { id: parseInt(params.id) }
        });
        return NextResponse.json({ message: 'Deleted' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete todo' }, { status: 500 });
    }
}
