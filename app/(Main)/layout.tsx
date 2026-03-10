const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className='w-full h-screen fixed flex flex-col'>
      <div className='flex flex-1 min-h-0'>
        {/* Sidebar */}
        <div className='flex flex-col flex-1 min-h-0'>
          <div className='flex-shrink-0'>{/* Topbar */}</div>
          <div
            id='layout-container'
            className='overflow-auto flex-1 custom-scroll pb-10'
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
