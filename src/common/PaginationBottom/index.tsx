import React from 'react';

type Props = {
    limit: number;
    perPage: number;
    currentPage: number;
    setCurrentPage: (page: number) => void;
};

const PaginationBottom = ({ limit, perPage, currentPage, setCurrentPage }: Props) => {
    return (
        <nav className="d-flex justify-content-center mt-4">
            <ul className="pagination">
                {limit ? (
                    Array(Math.ceil(limit / perPage))
                        .fill(null)
                        .map((_, index) => (
                            <li
                                key={index}
                                className={`page-item ${
                                    currentPage === index + 1 ? 'active' : ''
                                }`}
                            >
                                <button
                                    className="page-link"
                                    onClick={() => setCurrentPage(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            </li>
                        ))
                ) : (
                    <li className="page-item active">
                        <button className="page-link">1</button>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default PaginationBottom;
