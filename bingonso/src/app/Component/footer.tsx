export default function Footer() {
  return (
      <footer>
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex justify-between items-center h-[var(--footer-size)]">
          <div className="text-xs font-semibold">
            <span className="text-gray-500 dark:text-gray-400 mr-1">BinGoNso |</span>
            <span className="text-primary mr-1">2024</span>
            <span className="text-gray-500 dark:text-gray-400">Copyright</span>
          </div>
          <div className="text-xs font-semibold">
            <span className="text-gray-500 dark:text-gray-400 mr-1">Make by</span>
            <span className="text-primary">BinGoNso</span>
          </div>
        </div>
      </footer>
  );
}
