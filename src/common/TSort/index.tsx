import { DisplayedByNum } from "../SortByNum";
import { DisplayedByName } from "../SortByName";
import { useNavigate } from "react-router-dom";
import { Option } from "../../components/TaskList/Types";
import { ChangeEvent } from "react";

type Props = {
    setSortField: (title: string) => void;
    handleLimitChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    perPage: number;
    title: string;
    navigateUrl: string;
    searchOptions: Option[];
};

const TSort = ({
                   setSortField,
                   handleLimitChange,
                   perPage,
                   title,
                   navigateUrl,
                   searchOptions,
               }: Props) => {
    const navigate = useNavigate();

    const onClickHandler = () => {
        navigate(navigateUrl);
    };

    return (
        <div className="d-flex justify-content-between align-items-center mb-4">
            <DisplayedByName setSortField={setSortField} searchOptions={searchOptions} />

            <div className="text-end">
                {title && (
                    <div className="mb-2">
                        <button
                            onClick={onClickHandler}
                            className="btn btn-primary fw-bold"
                        >
                            {title}
                        </button>
                    </div>
                )}
                <DisplayedByNum handleLimitChange={handleLimitChange} perPage={perPage} />
            </div>
        </div>
    );
};

export default TSort;
