import { OnePersonType } from '@/app/person/[id]/[name]/page'
import React from 'react'

function OneActorDetail({ PersonData }: { PersonData: OnePersonType }) {
  return (
    <div className="w-full h-4/5 flex flex-col items-center justify-start shadow-lg shadow-gray-800 overflow-y-auto">
              <div
                className="w-full border-b border-gray-800 flex justify-center"
                style={{ paddingBottom: ".5rem" }}
              >
                <h1 className="lg:text-5xl md:text-3xl text-2xl uppercase font-bold">
                  {PersonData.name}
                </h1>
              </div>
              <div className="w-full" style={{ padding: ".5rem" }}>
                <p className="text-justify">{PersonData.biography}</p>
              </div>
              <div
                className="w-full flex items-center gap-1"
                style={{ padding: ".5rem" }}
              >
                <span className="text-gray-400">Birthday:</span>
                <p className="font-bold">{PersonData.birthday}</p>
              </div>
              {PersonData.deathday && (
                <div
                  className="w-full flex items-center gap-1"
                  style={{ padding: ".5rem" }}
                >
                  <span className="text-gray-400">Deathday:</span>
                  <p className="font-bold">{PersonData.deathday}</p>
                </div>
              )}
              <div
                className="w-full flex items-center gap-1"
                style={{ padding: ".5rem" }}
              >
                <span className="text-gray-400">gender:</span>
                <p className="font-bold">
                  {PersonData.gender === 1
                    ? "Female"
                    : PersonData.gender === 2
                    ? "Male"
                    : PersonData.gender === 3
                    ? "Unspecified"
                    : null}
                </p>
              </div>
              <div
                className="w-full flex items-center gap-1"
                style={{ padding: ".5rem" }}
              >
                <span className="text-gray-400">Department:</span>
                <p className="font-bold">{PersonData.known_for_department}</p>
              </div>
              <div
                className="w-full flex items-center gap-1"
                style={{ padding: ".5rem" }}
              >
                <span className="text-gray-400">Place of birth:</span>
                <p className="font-bold">{PersonData.place_of_birth}</p>
              </div>
              <div
                className="w-full flex items-center gap-1"
                style={{ padding: ".5rem" }}
              >
                <span className="text-gray-400">Popularity:</span>
                <p className="font-bold">{PersonData.popularity}</p>
              </div>
            </div>
  )
}

export default OneActorDetail