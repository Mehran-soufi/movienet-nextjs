import OneActor from "@/components/Oneactor/OneActor";

export type OnePersonType = {
  biography: string;
  birthday: string;
  deathday: string;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string;
};

async function fetchPersonData(id: string): Promise<OnePersonType | null> {
  const apiKey = process.env.NEXT_PUBLIC_APP_API_KEY;

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/person/${id}?api_key=${apiKey}&language=en`
    );

    if (!response.ok) {
      return null; 
    }

    const personData = await response.json();
    return personData;
  } catch (error) {
    return null; 
  }
}

export default async function PersonPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const PersonData = await fetchPersonData(id);
console.log(PersonData);

  if (!PersonData) {
    throw new Error("Data could not be fetched");
  }

  return <OneActor PersonData={PersonData} />;
}
