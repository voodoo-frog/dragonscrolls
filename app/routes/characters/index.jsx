import { Link } from "@remix-run/react";

export default function Characters() {
  return (
    <>
      <div className="block w-full p-5 text-center sm:flex sm:justify-between">
        <h3 className="mb-5 text-4xl">My Characters</h3>
        <Link
          to="/characters/new"
          className="self-center rounded bg-gray-700 p-3 uppercase text-white hover:bg-gray-800"
        >
          Create New Character
        </Link>
      </div>

      <div className="w-full p-5">
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden rounded border-b border-gray-200 shadow sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <tbody className="divide-y divide-gray-200 bg-white">
                    <tr>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img
                              className="h-10 w-10 rounded-full"
                              src="/images/fighter-emblem-color.jpeg"
                              alt=""
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              Brutus of Gotham
                            </div>
                            <div className="text-sm text-gray-500"></div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                        <a
                          href="jane"
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          View
                        </a>
                      </td>
                    </tr>

                    <tr>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img
                              className="h-10 w-10 rounded-full"
                              src="/images/warlock-emblem-color.jpeg"
                              alt=""
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              Joker, The Clown Prince of Crime
                            </div>
                            <div className="text-sm text-gray-500"></div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                        <a
                          href="#"
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          View
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
