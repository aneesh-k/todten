using FluentValidation;

namespace Application.Validators
{
    public static class PasswordValidator
    {
        public static IRuleBuilder<T, string> Password<T>(this IRuleBuilder<T, string> ruleBuilder)
        {
            var options = ruleBuilder.NotEmpty().MinimumLength(6).WithMessage("Min len = 6")
            .Matches("[A-Z]").WithMessage("Cap letter").Matches("[a-z]").WithMessage("small letter")
            .Matches("[^a-zA-Z0-9]").WithMessage("special char").Matches("[0-9]").WithMessage("Number is required");

            return options;
        }
    }
}