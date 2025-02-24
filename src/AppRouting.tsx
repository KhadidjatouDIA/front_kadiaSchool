import { createBrowserRouter, Navigate } from "react-router-dom";
import Users from "./pages/Users";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import Professors from "./pages/Professors";
import Students from "./pages/Students";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import ManagePassword from "./pages/ManagePassword";
import AddStudent from "./pages/AddStudent";
import EditStudent from "./pages/EditStudent"; // Assurez-vous d'importer le nouveau composant
import ProfesseurDetails from "./pages/ProfesseurDetails";
import Classes from "./pages/Classes";
import Course from "./pages/Course";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to={"/login"} />,
    },
    {
        path: "login",
        element: <Login />,
    },
    {
        path: "",
        element: <MainLayout />,
        children: [
            {
                path: "dashboard",
                element: <Dashboard />,
                handle: {
                    breadcrumb: "Tableau de bord",
                },
            },
            {
                path: "professors",
                handle: {
                    breadcrumb: "Professeurs",
                },
                children: [
                    {
                        index: true,
                        element: <Professors />,
                    },
                    {
                        path: "details/:id",
                        element: <ProfesseurDetails />,
                        handle: {
                            breadcrumb: ({ id }: { id: string }) => `Détails Professeur ${id}`,
                        },
                    },
                ],
            },
            {
                path: "classes",
                handle: {
                    breadcrumb: "Classes",
                },
                children: [
                    {
                        index: true,
                        element: <Classes />,
                    },
                    {
                        path: "details/:id",
                        element: <EditClasses />, // Changer pour EditStudent
                        handle: {
                            breadcrumb: ({ id }: { id: string }) => `Détails Classe ${id}`,
                        },
                    },
                    {
                        path: "addclasse", // Chemin pour la page d'ajout d'étudiant
                        element: <AddClasse />,
                        handle: {
                            breadcrumb: "Ajouter Classe",
                        },
                    },
                ],
            },

            {
                path: "students",
                handle: {
                    breadcrumb: "Etudiants",
                },
                children: [
                    {
                        index: true,
                        element: <Students />,
                    },
                    {
                        path: "details/:id",
                        element: <EditStudent />, // Changer pour EditStudent
                        handle: {
                            breadcrumb: ({ id }: { id: string }) => `Détails Etudiant ${id}`,
                        },
                    },
                    {
                        path: "addstudent", // Chemin pour la page d'ajout d'étudiant
                        element: <AddStudent />,
                        handle: {
                            breadcrumb: "Ajouter Etudiant",
                        },
                    },
                ],
            },
            {
                path: "users",
                element: <Users />,
            },

            {
                path: "settings",
                children: [
                    {
                        path: "profile",
                        element: <Profile />,
                    },
                    {
                        path: "manage-password",
                        element: <ManagePassword />,
                    },
                ],
            },
            {
                path: "courses",
                handle: {
                    breadcrumb: "Cours",
                },
                element: <Course />,
            },
            {
                path: "*",
                element: <NotFound />,
            },
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);
