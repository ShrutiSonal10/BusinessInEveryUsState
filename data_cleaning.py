import pandas as pd

# Define the file path
file_path = 'my-app/Backend/data/HI/restaurant.csv'  # Input and output file path

# Load the CSV file
df = pd.read_csv(file_path)

# Display initial information
print("Initial data preview:")
print(df.head())
print("\nMissing values before cleaning:")
print(df.isnull().sum())

# Step 3: Clean the Null Values in a Specific Column
# Specify the column name you want to clean
column_name = 'Rating'  # Replace 'ColumnName' with the actual column name

# Option 1: Drop rows with null values in the specific column
df_cleaned = df.dropna(subset=[column_name])

# Option 2: Alternatively, you can uncomment one of the following options to fill null values
# Fill null values with a placeholder or a specific value
# df[column_name].fillna('Unknown', inplace=True)  # Replace 'Unknown' with any value you prefer

# Fill null values with the mean (for numerical columns)
# df[column_name].fillna(df[column_name].mean(), inplace=True)

# Display information after cleaning
print("\nData after cleaning:")
print(df_cleaned.head())
print("\nMissing values after cleaning:")
print(df_cleaned.isnull().sum())

# Save the cleaned data to the same directory with a different file name
df_cleaned.to_csv('my-app/Backend/data/HI/data_cleaned.csv', index=False)
