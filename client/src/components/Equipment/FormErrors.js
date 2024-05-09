export default function FormErrors({formErrors, fieldName}) {
    if (formErrors[fieldName].length > 0) {
        return (
            <div className="text-sm mt-1 pl-2 text-mexican-orange font-medium mb-0">
                {formErrors[fieldName]}
            </div>
        );
    }else{
        return ('');
    }
}