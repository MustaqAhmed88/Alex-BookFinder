export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white p-8 rounded-xl shadow-2xl border-t-4 border-indigo-600">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-6 border-b pb-2">
          About Alex's BookFinder
        </h2>
        <p className="text-lg text-gray-700 mb-4">
          This application was built specifically for Alex, a college student, to quickly and efficiently locate study materials and reading assignments. It leverages the powerful and comprehensive data provided by the <strong>Open Library Search API</strong>.
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-semibold text-indigo-600 mb-3">Flexible Search</h3>
            <p className="text-gray-600">
              You can search by keywords across all fields, or specifically target <strong>Title</strong> or <strong>Author</strong> or <strong>ISBN</strong>. This helps whether you’re recalling a vague book name or looking for a specific assigned text.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-indigo-600 mb-3">Data Reliability</h3>
            <p className="text-gray-600">
              We prioritize showing results that include an image cover and a known author to ensure you get the most accurate and reliable reference points for your studies.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
