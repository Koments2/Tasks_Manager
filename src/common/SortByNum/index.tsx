import { ChangeEvent } from "react";

type Props = {
    perPage: number;
    handleLimitChange: (e: ChangeEvent<HTMLSelectElement>) => void;
};

export const DisplayedByNum = ({ perPage, handleLimitChange }: Props) => {
    return (
        <div className="d-flex justify-content-end">
            <select
                value={perPage}
                onChange={handleLimitChange}
                className="form-select w-auto"
            >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
            </select>
        </div>
    );
};
