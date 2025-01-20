public class Asteroid
{
    public int Id { get; set; }
    public string Name { get; set; }
    public double DiameterInKm { get; set; }
    public bool IsPotentiallyHazardous { get; set; }
    public string Composition { get; set; }

    public Asteroid(string name, double diameterInKm, bool isPotentiallyHazardous, string composition)
    {
        Name = name;
        DiameterInKm = diameterInKm;
        IsPotentiallyHazardous = isPotentiallyHazardous;
        Composition = composition;
    }
}