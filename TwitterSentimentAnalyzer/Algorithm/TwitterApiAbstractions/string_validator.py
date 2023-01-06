from flask_restful import abort


class StringValidator:
    def __init__(self, value: str):
        self.value = value

    def StringShouldNotBeEmpty(self):
        """ Validates if the given string is empty """
        self.value.strip()
        if len(self.value) < 1:
            abort(400, message = f"String \"{self.value}\" is empty")
        return self

    def StringMustNotIncludeWhitespace(self):
        """ Validates if the given string includes whitespaces between words """
        self.value.strip()
        if self.value.find(' ') != -1:
            abort(400, message = f"String \"{self.value}\" should not include whitespace")
        return self

    def StringMustBeLongerThan(self, min_length: str):
        """ Validates if the given string is of the specified minimum length """
        self.value.strip()
        if len(self.value):
            abort(400, message = f"String \"{self.value}\" is not of minimum length {min_length}")
        return self

    def StringMustEqualBooleanValue(self):
        """" Validates if the given string is a boolean value """
        self.value.strip()
        if self.value.lower() not in ['true', 'false']:
            abort(400, message = f"Value \"{self.value}\" is not a boolean")
        return self
