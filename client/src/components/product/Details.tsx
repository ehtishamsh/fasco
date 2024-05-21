function Details() {
  return (
    <div className="max-w-6xl mx-auto px-8 py-4 max-sm:px-4  bg-background">
      <h1 className="text-2xl font-semibold mb-8">Details</h1>
      <p className="text-gray-400 text-sm tracking-wide mb-8">
        Just as a book is judged by its cover, the first thing you notice when
        you pick up a modern smartphone is the display. Nothing surprising,
        because advanced technologies allow you to practically level the display
        frames and cutouts for the front camera and speaker, leaving no room for
        bold design solutions. And how good that in such realities Apple
        everything is fine with displays. Both critics and mass consumers always
        praise the quality of the picture provided by the products of the
        Californian brand. And last year's 6.7-inch Retina panels, which had
        ProMotion, caused real admiration for many.
      </p>
      <h1 className="text-2xl font-semibold mb-8">Screen</h1>
      <div className="w-full">
        <div className="flex w-full justify-between items-center text-sm border-b border-gray-300 mb-6 pb-2">
          <h2>Screen Diagonal</h2>
          <p>6.7"</p>
        </div>
        <div className="flex w-full justify-between items-center text-sm border-b border-gray-300 pb-2">
          <h2>Screen Resolution</h2>
          <p>2160x1620</p>
        </div>
      </div>
    </div>
  );
}

export default Details;
