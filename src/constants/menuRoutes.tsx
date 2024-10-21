import { USERS_PATH, VAES_PATH } from "@/constants/routes";
import { faGraduationCap, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const MENU_ROUTES = [
  {
    name: "Mes VAE",
    path: VAES_PATH,
    icon: <FontAwesomeIcon icon={faGraduationCap} />,
  },
  {
    name: "Utilisateurs",
    path: USERS_PATH,
    icon: <FontAwesomeIcon icon={faUsers} />,
  },
];
