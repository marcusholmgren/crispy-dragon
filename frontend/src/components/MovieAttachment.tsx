import * as React from "react";
import type {Movie} from "../models";
import {useState} from "react";
import {Button} from "./Button";


interface MovieAttachmentProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  movie: Movie
}

export function MovieAttachment({ onSubmit, movie }: MovieAttachmentProps) {
  const [filename, setFilename] = useState('')

  function onChange(e:  React.ChangeEvent<HTMLInputElement>) {
    if ((e.currentTarget.files?.length ?? 0) > 0) {
      const first = e.currentTarget.files?.item(0)
      if (first) {
        setFilename(first.name)
      }
    }
  }

  const attachmentEl = movie?.info?.movie ?  (
      <div className="sm:flex">
        <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-4">
          <img
                className="h-32 w-full sm:w-32 border border-gray-300 bg-white text-gray-300"
                src={movie.info?.movie ? movie.info?.movie : "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}
                alt=""
              />
        </div>
        <div>
          <h4 className="text-lg font-bold">{movie.title}</h4>
          <p className="mt-1">
            {movie.info?.plot}
          </p>
        </div>
      </div>
  ) : (
    <form className="grid gap-4 grid-cols-1 max-w-md" onSubmit={onSubmit}>
      <div>

        <div className="sm:col-span-6">
          <label
            htmlFor="cover_photo"
            className="block text-sm font-medium text-gray-700"
          >
            Movie photo
          </label>
          <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="text-sm text-gray-600">
                <label className="bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  {filename ? `Upload ${filename}`: "Upload a file"}
                  <input
                    name="file"
                    type="file"
                    title="Upload a file"
                    className="hidden"
                    onChange={onChange}
                  />
                </label>

              </p>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div>
      </div>

      <span className="inline-flex rounded-md shadow-sm">
        <Button type="submit">Save Movie Photo</Button>
      </span>
    </form>
  );


  return attachmentEl
}
