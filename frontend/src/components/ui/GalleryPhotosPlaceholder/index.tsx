export const GalleryPhotosPlaceholder = () => {
  return (
    <section className="mx-auto grid h-auto w-full max-w-7xl grid-cols-1 items-start gap-x-4 gap-y-5 p-4 xs:grid-cols-2 md:gap-x-16 lg:grid-cols-3">
      <h3 className="col-span-full mb-2 text-center text-2xl font-bold text-zinc-900 sm:text-3xl lg:text-4xl">
        Carregando...
      </h3>
      {[...Array(9)].map((_, i) => (
        <div key={i} className="grid grid-cols-1 gap-y-5">
          <div className="col-span-full h-80 w-full animate-pulse rounded-md bg-gradient-to-tr from-zinc-400 to-zinc-200" />
          <div className="col-span-full h-80 w-full animate-pulse rounded-md bg-gradient-to-tr from-zinc-400 to-zinc-200" />
          <div className="col-span-full h-80 w-full animate-pulse rounded-md bg-gradient-to-tr from-zinc-400 to-zinc-200" />
        </div>
      ))}
    </section>
  )
}
