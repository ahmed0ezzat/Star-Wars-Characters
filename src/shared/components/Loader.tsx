function Loader() {
  return (
    <output className="flex justify-center items-center h-64" aria-busy="true">
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    </output>
  );
}

export default Loader;
