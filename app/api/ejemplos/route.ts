import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('ejemplos')
      .select('id, title, description, image, created_at')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error obteniendo ejemplos:', error);
      return NextResponse.json({ error: 'No se pudieron obtener los ejemplos.' }, { status: 500 });
    }

    return NextResponse.json({ ejemplos: data ?? [] });
  } catch (error) {
    console.error('Error en GET /api/ejemplos:', error);
    return NextResponse.json({ error: 'Error interno.' }, { status: 500 });
  }
}

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
      .from('ejemplos')
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

