import Layout from "../Layout/Layout";
import contactJSON from "../../data/contact.json";

const Avatar = () => {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      width="80"
      height="80"
    >
      <mask
        id=":r28:"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="36"
        height="36"
      >
        <rect width="36" height="36" rx="72" fill="#FFFFFF"></rect>
      </mask>
      <g mask="url(#:r28:)">
        <rect width="36" height="36" fill="#c4dbb4"></rect>
        <rect
          x="0"
          y="0"
          width="36"
          height="36"
          transform="translate(-1 5) rotate(25 18 18) scale(1.1)"
          fill="#539fa2"
          rx="36"
        ></rect>
        <g transform="translate(-1 5) rotate(5 18 18)">
          <path d="M13,20 a1,0.75 0 0,0 10,0" fill="#000000"></path>
          <rect
            x="14"
            y="14"
            width="1.5"
            height="2"
            rx="1"
            stroke="none"
            fill="#000000"
          ></rect>
          <rect
            x="20"
            y="14"
            width="1.5"
            height="2"
            rx="1"
            stroke="none"
            fill="#000000"
          ></rect>
        </g>
      </g>
    </svg>
  );
};

const ContactPage = () => {
  return (
    <Layout>
      <div className="container mx-auto" style={{ padding: "10px 30px" }}>
        <Avatar />
        <table>
          <tbody>
            <tr>
              <td>Created By: </td>
              <td>{contactJSON.name}</td>
            </tr>
            <tr>
              <td>Email: </td>
              <td>
                <a href={`mailto:${contactJSON.email}`}>{contactJSON.email}</a>
              </td>
            </tr>
            <tr>
              <td>Github: </td>
              <td>
                <a href={contactJSON.github.url}>
                  {contactJSON.github.username}
                </a>
              </td>
            </tr>
            <tr>
              <td>Alamat: </td>
              <td>
                {contactJSON.address}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default ContactPage;
