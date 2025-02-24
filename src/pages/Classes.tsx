import React, { useEffect, useState, useCallback } from 'react';
import axios, { AxiosError } from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './Classes.css';

interface Classe {
    id?: number;
    name?: string;
    description?: string;
    archive?: boolean;
}

const Classes: React.FC = () => {
    const [classes, setClasses] = useState<Classe[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState<string>('');
    const navigate = useNavigate();

    // Fonction pour récupérer les classes, optimisée avec useCallback
    const fetchClasses = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axios.get<Classe[]>('http://localhost:8080/classes');
            setClasses(response.data);
        } catch (err) {
            const axiosError = err as AxiosError;
            setError(axiosError.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchClasses();
    }, [fetchClasses]);

    // Gestion de la recherche
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    // Gestion de l'édition
    const handleEdit = (id?: number) => {
        if (id !== undefined) {
            navigate(`/classes/details/${id}`);
        }
    };

    // Gestion de la suppression
    const handleDelete = async (id?: number) => {
        if (id === undefined) return;

        if (window.confirm('Voulez-vous vraiment supprimer cette classe ?')) {
            try {
                const response = await axios.delete(`http://localhost:8080/classes/${id}`);
                console.log('Response:', response);
                setClasses(prevClasses => prevClasses.filter(classe => classe.id !== id));
                alert('Classe supprimée avec succès!');
            } catch (error: any) {
                console.error('Erreur lors de la suppression:', error);
                alert('Erreur lors de la suppression: ' + (error.response?.data ?? error.message));
            }
        }
    };

    // Filtrage des classes en fonction de la recherche
    const filteredClasses = classes
        ? classes.filter(classe =>
            classe.name?.toLowerCase().includes(search.toLowerCase()) ||
            classe.description?.toLowerCase().includes(search.toLowerCase())
        )
        : [];

    if (loading) return <div className="loading">Chargement...</div>;
    if (error) return <div className="error">Erreur : {error}</div>;

    return (
        <div className="container">
            <h1>Liste des Classes</h1>
            <div className="controls">
                <input
                    type="text"
                    placeholder="Rechercher une classe..."
                    value={search}
                    onChange={handleSearchChange}
                    className="search-input"
                />
                <Link to="/classes/addclass">
                    <button className="add-button">Nouvelle Classe</button>
                </Link>
            </div>

            <table className="classes-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Nom</th>
                    <th>Description</th>
                    <th>Archivé</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {filteredClasses.length > 0 ? (
                    filteredClasses.map(classe => (
                        <tr key={classe.id}>
                            <td>{classe.id}</td>
                            <td>{classe.name}</td>
                            <td>{classe.description}</td>
                            <td>{classe.archive ? 'Oui' : 'Non'}</td>
                            <td className="actions">
                                <button className="icon-button edit" onClick={() => handleEdit(classe.id)}>
                                    <FaEdit />
                                </button>
                                <button className="icon-button delete" onClick={() => handleDelete(classe.id)}>
                                    <FaTrash />
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={5} className="no-results">Aucune classe trouvée</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default Classes;
