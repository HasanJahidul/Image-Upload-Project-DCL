import Link from "next/link";
import Router from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import useInput from "../hooks/useInput";
import { jsxService } from "../service";

export default function QRcode({
  setShow,
  showModal,
}: {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  showModal: boolean;
}) {
  const [errorMessage, setErrorMessage] = useState("");
  const { user } = useAuth();
  const userId = user?.id;
  const getUrlFileExtension = (url: string) => {
    const res = new URL(url).pathname.substring(
      new URL(url).pathname.lastIndexOf(".") + 1
    );
    return res;
  };
  const validURL = (url: string) => {
    var res = url.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    );
    return res ? getUrlFileExtension(url) : setErrorMessage("Invalid URL");
  };
  const uploadImg = (url: string) => {
    const ext = validURL(url);
    console.log(ext);

    if (ext === "jpg" || ext === "png") {
      jsxService()
        .post(`/img/upload/`, { url, userId })
        .then((res) => {
          toast.success("Upload success");
          setShow(false);
          Router.reload();
        })
        .catch((err) => {
          console.log({ err });
        });
    } else {
      setErrorMessage("The file must be a jpg or png");
    }
  };

  const LinkInputController = useInput();
  return (
    <div
      className={`overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 transition-all duration-300 ${
        showModal ? "" : "opacity-0 -translate-y-[1500px]"
      }`}
    >
      <div
        className={`flex justify-center items-center h-full transition-all delay-300 ${
          showModal ? "bg-[rgba(1,1,1,0.4)]" : "bg-transparent"
        }`}
      >
        <div className="relative p-8">
          <div className="relative bg-white rounded-lg shadow">
            <button
              onClick={() => setShow(false)}
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              data-modal-toggle="popup-modal"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>

              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-10 rounded shadow-2xl">
              {/* <QRCode
                value={`http://hasanjahidul.com/product/detail.php?id=${id}`}
                height="500px"
                width="500px"
                renderAs="canvas"
                size={500}
              /> */}
              <div className="p-10 bg-white rounded-xl drop-shadow-lg space-y-5">
                <h1 className="text-center text-3xl">Add Image</h1>
                <div className="flex flex-col space-y-2">
                  <label className="text-sm ">Link</label>
                  <input
                    className="w-96 px-3 py-2 rounded-md border border-slate-400"
                    type="email"
                    placeholder="Enter Image Link"
                    name="email"
                    id="email"
                    {...LinkInputController}
                  />
                  <span className="text-red-400 pl-2 font-semibold">
                    {errorMessage}
                  </span>
                </div>

                <button
                  className="w-full px-10 py-2 bg-blue-600 text-white rounded-md
            hover:bg-blue-500 hover:drop-shadow-md duration-300 ease-in"
                  type="submit"
                  onClick={() => uploadImg(LinkInputController.value)}
                >
                  Add
                </button>
              </div>

              {/*end*/}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
