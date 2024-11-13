import { Option } from "../../components/TaskList/Types";

type Props = {
    searchOptions: Option[];
    setSortField: (name: string) => void;
};

export const DisplayedByName = ({ searchOptions, setSortField }: Props) => {
    return (
        <div className="d-flex justify-content-center">
            <select
                onChange={(e) => setSortField(e.target.value)}
                className="form-select w-auto"
            >
                {searchOptions?.map((option, index) => (
                    <option key={index} value={option.value}>
                        Сортувати {option.name}
                    </option>
                ))}
            </select>
        </div>
    );
};
