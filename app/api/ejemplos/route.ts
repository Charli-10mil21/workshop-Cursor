import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const title = formData.get('title');
    const description = formData.get('description');
    const image = formData.get('image');

    if (typeof title !== 'string' || typeof description !== 'string') {
      return NextResponse.json({ error: 'Título y descripción son obligatorios.' }, { status: 400 });
    }

    const imageName =
      typeof image === 'string'
        ? image
        : image instanceof File
          ? image.name
          : null;

    const { error } = await supabase
      .from('workshop.ejemplos')
      .insert({
        title,
        description,
        image: imageName ?? '',
      });

    if (error) {
      console.error('Error insertando ejemplo:', error);
      return NextResponse.json({ error: 'No se pudo guardar el ejemplo.' }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Error en POST /api/ejemplos:', error);
    return NextResponse.json({ error: 'Error interno.' }, { status: 500 });
  }
}

