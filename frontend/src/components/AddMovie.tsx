import * as React from 'react';
import { Button } from './Button';

interface FormElements extends HTMLFormControlsCollection {
  title: HTMLInputElement;
  plot: HTMLTextAreaElement;
  year: HTMLInputElement;
  rating: HTMLSelectElement;
}

interface UserFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

interface Props {
  onSubmit: (movie: Movie) => Promise<boolean>;
}

export interface Movie {
  title: string;
  plot: string;
  year: number;
  rating: number;
}

export function AddMovie({ onSubmit }: Props) {

  async function handleSubmit(event: React.SyntheticEvent<UserFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const el = form.elements;
    const movie: Movie = {
      title: el.title.value,
      plot: el.plot.value,
      year: Number(el.year.value),
      rating: Number(el.rating.value),
    };

    const success = await onSubmit(movie);
    if (success) {
      form.reset()
    }
  }

  return (
    <form
      className="space-y-8 divide-y divide-gray-200"
      onSubmit={handleSubmit}
    >
      <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
        <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Movie
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Add new movie to list
            </p>
          </div>
          <div className="space-y-6 sm:space-y-5">

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Title
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  type="text"
                  name="title"
                  id="title"
                  autoComplete="off"
                  required
                  className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="plot"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Plot
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <textarea
                  id="plot"
                  name="plot"
                  rows={3}
                  className="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                ></textarea>
                <p className="mt-2 text-sm text-gray-500">
                  Write a few sentences about the plot.
                </p>
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="year"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Year
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  id="year"
                  name="year"
                  type="number"
                  min="1900"
                  max="2099"
                  step="1"
                  defaultValue="2021"
                  required
                  autoComplete="off"
                  className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="rating"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Rating
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <select
                  id="rating"
                  name="rating"
                  autoComplete="rating"
                  required
                  defaultValue=""
                  className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                >
                  <option disabled value=""></option>
                  <option value={1}>Avoid at all costs</option>
                  <option value={2}>Don't waist your time</option>
                  <option value={3}>Ok to waist some time</option>
                  <option value={4}>You must see this</option>
                  <option value={5}>It's a masterpiece</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <Button type="submit">
          Save Movie
        </Button>
      </div>
    </form>
  );
}
