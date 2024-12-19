const Footer = () => {
  return (
    <footer className="w-full  flex justify-center items-center">
      <div className="flex flex-col md:flex-row justify-between items-center w-[90%]">
        <section>
          <img src="https://github.com/BPM94/CDNMD/raw/main/CTM/crimson_white.png" className="max-w-[500px]" alt="" />
        </section>

        <section>
          <p>Copyright © 2023. All rights reserved.</p>
        </section>
      </div>
    </footer>
  );
}

export default Footer;