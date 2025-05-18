import {
    FaGraduationCap,
    FaBriefcase,
    FaBook,
    FaCheckCircle,
    FaUsers,
  } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

export const colors = {
    brownNavbar: "#877358",
    darkBrown: "#1E1E1E",
    lightBrown: "#A28D72",
    chocolate: "#3D2B1F",
    cream: "#EFE4D7",
    darkCream: '#E3D6C4',
    brownButton: "#C4A484"
};

export const texts = {
    about_pg_paragraph_1: {
        title: "O meni",
        text: "Zovem se Jaksa Vukasinovic i strastveni sam profesor matematike sa više od 30 godina iskustvom u podučavanju učenika i studenata različitih uzrasta! Moj cilj je da približim matematiku svakom učeniku na način koji je zanimljiv, logičan i primenljiv."
    },
    about_pg_paragraph_2: {
        title: "Metodologija rada",
        text: "Verujem da je matematika ključ za razvijanje kritičkog mišljenja i rešavanje problema. Trudim se da:",
        points : [
            {label: "", content:"Povezujem teoriju sa realnim svetom kako bi učenici razumeli praktičnu primenu matematike."},
            {label: "", content:"Kroz kreativne zadatke i primere probudim znatiželju i interesovanje za ovu nauku."},
            {label:"", content:"Prilagodim nastavu potrebama svakog učenika."}
          ]
    },
    about_pg_paragraph_3: {
        title: "Edukacija i iskustvo",
        text: "",
        points : [
            {label: "Diploma", content:":  dipl. gradjevinski inzenjer"},
            {label: "Fakultet", content:": Gradjevinski fakultet, Univerzitet u Beogradu"},
            {label: "Specijalizacija",content:": Algebra, geometrija, statistika"},
            {label: "Iskustvo",content: ": 34 godine uspesnog rada u sopstvenoj skoli matematike"}
        ]
    },
}


// prettier-ignore
export const stats = [
  { icon: FaGraduationCap, value: "1500+", label: "zadovoljnih studenata", bgColor: '#0B6623'},
  { icon: FaBriefcase, value: "30+", label: "godina iskustva", bgColor: '#3D7D45' },
  { icon: FaBook, value: "10+", label: "napisanih zbirki", bgColor: '#679267' },
  { icon: FaCheckCircle, value: "88%", label: "prolaznost na ispitu", bgColor: '#87A07F'},
  { icon: FaUsers, value: "max. 7", label: "studenata u grupi", bgColor: '#A9BA9D'},
  { icon: FaLocationDot, value: "centralna", label: "lokacija", bgColor: '#B8C9AE'},
];