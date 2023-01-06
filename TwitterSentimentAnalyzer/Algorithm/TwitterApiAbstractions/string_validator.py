from flask_restful import abort


class StringValidator:
    value: str

    def __init__(self, value: str):
        self.value = value.strip()

    def StringShouldNotBeEmpty(self):
        """ Validates if the given string is empty """
        if len(self.value) < 1:
            abort(400, message = f"String \"{self.value}\" is empty")
        return self

    def StringMustNotIncludeWhitespace(self):
        """ Validates if the given string includes whitespaces between words """
        if self.value.find(' ') != -1:
            abort(400, message = f"String \"{self.value}\" should not include whitespace")
        return self

    def StringMustBeLongerThan(self, min_length: int = 1):
        """ Validates if the given string is of the specified minimum length """
        if len(self.value) < min_length:
            abort(400, message = f"String \"{self.value}\" is not of minimum length {min_length}")
        return self

    def StringMustEqualBooleanValue(self):
        """" Validates if the given string is a boolean value """
        if self.value.lower() not in ['true', 'false']:
            abort(400, message = f"Value \"{self.value}\" is not a boolean")
        return self
