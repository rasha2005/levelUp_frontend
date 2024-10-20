import Header from "./Header"


export default function Layout({ children }:any) {
  return (
    <div>
      <Header/>
      <main>{children}</main>
    </div>
  );
};