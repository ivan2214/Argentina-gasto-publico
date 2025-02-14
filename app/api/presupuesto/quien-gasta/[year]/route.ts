const url =
  "https://www.presupuestoabierto.gob.ar/sici/rest-api/reporte/quien-gasta";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ year: string }> }
): Promise<Response> {
  const year = (await params).year; // 'a', 'b', or 'c'

  const response = await fetch(`${url}/${year}`);

  if (!response.ok) {
    return new Response("Failed to fetch data", { status: 500 });
  }

  const data = await response.json();
  //  res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");
  //res.status(200).json(data);

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
