import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type RouteContext = {
    params: {
        id: string
    }
}

export async function PATCH(req: NextRequest, { params }: RouteContext) {
    if (!params.id) {
        return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
    }
    
    const todo = await prisma.todo.update({
        where: { id: Number(params.id) },
        data: { completed: true },
    });
    return NextResponse.json(todo);
}

export async function DELETE(req: NextRequest, { params }: RouteContext) {
    if (!params.id) {
        return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
    }

    await prisma.todo.delete({ where: { id: Number(params.id) } });
    return NextResponse.json({ message: 'Deleted' });
}
