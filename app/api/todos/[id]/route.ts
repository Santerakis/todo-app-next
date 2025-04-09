import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';

export async function PATCH(
    req: NextRequest,
    { params }: { params: { id: string } }
): Promise<Response> {
    const id = parseInt(params.id);
    if (isNaN(id)) {
        return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    try {
        const todo = await prisma.todo.update({
            where: { id },
            data: { completed: true },
        });
        return NextResponse.json(todo);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update todo' }, { status: 500 });
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
): Promise<Response> {
    const id = parseInt(params.id);
    if (isNaN(id)) {
        return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    try {
        await prisma.todo.delete({
            where: { id }
        });
        return NextResponse.json({ message: 'Deleted' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete todo' }, { status: 500 });
    }
}
